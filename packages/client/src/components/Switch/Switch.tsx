import { useState } from 'react'
import styles from './Switch.module.css'

interface SwitchProps {
  data: {
    'name': string;
    'src'?: string | undefined;
  }[],
  'style'?: string
}

const Switch: React.FC<SwitchProps> = ({ data, style }) => {
  const [activeSwitch, setActiveSwitch] = useState(0)

  return (
    <div className={styles.switch}>
      {data.map((item, index) => (
        <div
          className={`${styles.switch_item}${style == 'width_auto' ? ` ${styles.switch_item_width_auto}` : ''}${index === activeSwitch ? ` ${styles.switch_item_active}` : ''}`}
          key={index}
          onClick={() => setActiveSwitch(index)}
        >
          {item.src && <img className={styles.switch_item_img} src={item.src} alt={item.name} />}
          <p className={styles.switch_item_text}>{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Switch
