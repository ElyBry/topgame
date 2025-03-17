import { useState } from 'react'
import styled, { css } from 'styled-components'

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
    <SwitchStyle>
      {data.map((item, index) => (
        <SwitchItemStyle
          isWidthAuto={isWidthAuto}
          $active={index === activeSwitch}
          key={index}
          onClick={() => handleItem(index)}
        >
          {item.src && <SwitchItemImg src={item.src} alt={item.name} />}
          <SwitchItemText>{item.name}</SwitchItemText>
        </SwitchItemStyle>
      ))}
    </SwitchStyle>
  )
}

const SwitchStyle = styled.div`
    margin-bottom: 30px;
    display: flex;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const SwitchItemActiveStyle = css `
    color: var(--btn-ele-bg-hover);
    background: #0c71b01a;
    border-color: var(--btn-ele-bg-hover);
`;

const SwitchItemWidthAutoStyle = css `
    width: auto;
    padding: 7px 15px;
`;

const SwitchItemStyle = styled.div<{ isWidthAuto: boolean | undefined, $active: boolean }>`
    width: 100px;
    cursor: pointer;
    text-align: center;
    padding: 7px 20px;
    background: #e3e3e3;
    border: 1px solid #d0d0dc;
    transition: .3s;

    &:first-child {
        border-radius: 5px 0 0 5px;
    }

    &:last-child {
        border-radius: 0 5px 5px 0;
    }

    ${(props) => props.isWidthAuto ? SwitchItemWidthAutoStyle : ''}
    ${(props) => props.$active ? SwitchItemActiveStyle : ''}
`;

const SwitchItemImg = styled.img`
    display: block;
    height: 45px;
    margin: 0 auto 15px;
`;

const SwitchItemText = styled.p`
    width: 100%;
`;

export default Switch
