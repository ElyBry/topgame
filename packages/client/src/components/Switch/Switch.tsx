import { useState } from 'react'
import styles from './Switch.module.css'

interface SwitchProps {
  data: {
    name: string;
    src?: string | undefined;
  }[],
  isWidthAuto?: boolean,
  fnAfterClick?: (index: number) => void
}

const Switch: React.FC<SwitchProps> = ({ data, isWidthAuto, fnAfterClick }) => {
  const [activeSwitch, setActiveSwitch] = useState(0);

  function handleItem(index: number) {
    setActiveSwitch(index);

    if (fnAfterClick && typeof fnAfterClick === 'function') {
      fnAfterClick(index);
    }
  }

  return (
    <div className={styles.switch}>
      {data.map((item, index) => (
        <div
          className={`${styles.switch_item}${isWidthAuto ? ` ${styles.switch_item_width_auto}` : ''}${index === activeSwitch ? ` ${styles.switch_item_active}` : ''}`}
          key={index}
          onClick={() => handleItem(index)}
        >
          {item.src && <img className={styles.switch_item_img} src={item.src} alt={item.name} />}
          <p className={styles.switch_item_text}>{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Switch
