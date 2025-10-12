import styles from './style.module.css';
export default function GuestLayout({children} : {children: React.ReactNode}) {
    return (
        <div className={styles['wrapperGuest']}> 
            {children}
        </div>
    )
}