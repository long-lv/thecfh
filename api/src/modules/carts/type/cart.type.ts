/**
 * Cart Lifecycle Flow

Create a new cart → ACTIVE.

User adds/removes products → still ACTIVE.

User successfully checks out → change status to CHECKED_OUT.

Cart remains inactive for too long (guest) or user abandons it → change status to ABANDONED.

Cron job cleanup → delete ABANDONED carts after X days.
 */
export enum StatusCart {
	ACTIVE = 'ACTIVE',
	CHECKED_OUT = 'CHECKED_OUT',
	ABANDONED = 'ABANDONED',
}
