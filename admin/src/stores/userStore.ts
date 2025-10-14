import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUserResponse } from "../lib/type/auth.type";

/** Type */
export type TUser = Omit<IUserResponse, "tokens">; // Omit dùng để xóa 1, nhiều field ra khỏi interface, ở đây user sẽ có các thuộc tính của IUser trừ tokens.
interface IUserState {
	// state
	user: TUser | null;
	isAuthenticated: boolean;

	// action
	setUser: (user: TUser | null) => void;
	clearUser: () => void;
}


/** Create storage */

export const useUserStore = create<IUserState>()(
	  // DevTools middleware - Để debug trong Redux DevTools
	devtools(
		// Persist middleware - Tự động lưu vào sessionStorage
		persist(
			(set) => ({
				user: null,
				isAuthenticated: false,
				// action
				// set user khi login thanh cong
				setUser: (user: TUser | null) => {
					set({
						user, 
						isAuthenticated: !!user
					})
				},

				// clear user khi logout
				clearUser: () => {
					set({
						user: null,
						isAuthenticated: false
					})
				}
			}),
			// Persist config
			{
				name: 'user-storage', // key trong sessionStorage
				storage: createJSONStorage(() => sessionStorage), // dùng sesionStorage
				partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // chỉ lưu 2 thuộc tính này vào sessionStorage.
			}
		),
		{
			name: 'UserStore', // ten hien thi trong Devtool
		}
	)
)