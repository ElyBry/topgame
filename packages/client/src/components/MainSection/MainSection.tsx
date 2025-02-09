import styles from './MainSection.module.css';
import { PropsWithChildren } from "react";

const MainSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.section}>
      <div className={styles.section_fixed}>
        <div className={styles.section_col}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainSection
