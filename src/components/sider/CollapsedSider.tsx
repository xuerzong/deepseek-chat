import { IconPanelLeftOutline16, NewChatIcon } from '../base/icons'
import { useTranslate } from '../../i18n/index'
import { setSiderCollapsed } from '../../services/settings'
import { newChat } from '../../services/chat/store'
import { IconButton } from '../base/IconButton'
import styles from './Sider.module.css'

/** 收起后左上角的按钮组 */
export const CollapsedSider = () => {
  const t = useTranslate()
  return (
    <div className={styles.collapsed}>
      <div className={styles.collapsedGroup}>
        <IconButton
          size="m"
          tone="primary"
          icon={<IconPanelLeftOutline16 />}
          tooltip={t('expandSiderbarButton')}
          onClick={() => setSiderCollapsed(false)}
        />
        <IconButton
          size="m"
          tone="primary"
          icon={<NewChatIcon />}
          tooltip={t('newChat')}
          onClick={newChat}
        />
      </div>
    </div>
  )
}
