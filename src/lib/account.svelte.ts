// Mock account (frontend only — no real auth, no backend, no real data).
// "Sign in" is a magic-link demo: enter any email, we pretend a link was
// sent, and the demo account (Priya Mehta) signs in. Orders, addresses,
// notification preferences and loyalty stamps persist in localStorage.
import { mockAccount, type MockOrder } from '#lib/data/site.ts';

const ACCOUNT_KEY = 'sweetcrust-account-v1';

export type Prefs = { orderSms: boolean; orderWhatsapp: boolean; orderEmail: boolean; promoEmail: boolean };

export type AccountUser = {
	name: string;
	email: string;
	phone: string;
	addresses: { label: string; detail: string }[];
	orders: MockOrder[];
	prefs: Prefs;
	stamps: number;
};

const user = $state<{ value: AccountUser | null }>({ value: null });
// Email the visitor typed on the sign-in form (mock magic link pending).
const pendingEmail = $state<{ value: string | null }>({ value: null });

function demoUser(): AccountUser {
	return {
		name: mockAccount.name,
		email: mockAccount.email,
		phone: mockAccount.phone,
		addresses: mockAccount.addresses.map((a) => ({ ...a })),
		orders: mockAccount.orders.map((o) => ({ ...o, items: o.items.map((i) => ({ ...i })) })),
		prefs: { orderSms: true, orderWhatsapp: true, orderEmail: true, promoEmail: false },
		stamps: 5
	};
}

function persist() {
	if (typeof window === 'undefined' || !user.value) return;
	try {
		window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify($state.snapshot(user.value)));
	} catch {
		// Storage blocked — the in-memory account still works for this visit.
	}
}

export function restoreAccount() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(ACCOUNT_KEY);
		if (!raw) return;
		const parsed = JSON.parse(raw) as AccountUser;
		if (parsed && typeof parsed.email === 'string') user.value = parsed;
	} catch {
		// Ignore corrupt storage.
	}
}

export const account = {
	get user(): AccountUser | null {
		return user.value;
	},
	get signedIn() {
		return user.value !== null;
	},
	get pendingEmail() {
		return pendingEmail.value;
	}
};

/** Mock magic link: any email works. The "link" is simulated — the demo
    account signs in immediately and the page explains it is a demo. */
export function requestMagicLink(email: string) {
	pendingEmail.value = email.trim();
}

export function confirmMagicLink() {
	user.value = demoUser();
	pendingEmail.value = null;
	persist();
}

export function signOut() {
	user.value = null;
	pendingEmail.value = null;
	if (typeof window !== 'undefined') {
		try {
			window.localStorage.removeItem(ACCOUNT_KEY);
		} catch {
			// Ignore.
		}
	}
}

export function addOrder(order: MockOrder) {
	if (!user.value) return;
	user.value.orders.unshift(order);
	persist();
}

/** One loyalty stamp per order placed (mock). */
export function earnStamp() {
	if (!user.value) return;
	user.value.stamps = Math.min(16, user.value.stamps + 1);
	persist();
}

export function setPref(key: keyof Prefs, value: boolean) {
	if (!user.value) return;
	user.value.prefs[key] = value;
	persist();
}

export function addAddress(label: string, detail: string) {
	if (!user.value) return;
	user.value.addresses.push({ label, detail });
	persist();
}

export function removeAddress(index: number) {
	if (!user.value) return;
	user.value.addresses.splice(index, 1);
	persist();
}
