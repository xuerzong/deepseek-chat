import { useState } from 'react'
import { useTranslate } from '../../i18n/index'
import { normalizeBaseURL, setBaseURL, useSettings } from '../../services/settings'
import styles from './Settings.module.css'

export const BaseURLField = () => {
  const t = useTranslate()
  const baseURL = useSettings((state) => state.baseURL)
  const [value, setValue] = useState(baseURL ?? __API_ORIGIN__)
  const [error, setError] = useState<string | null>(null)
  const dirty = value.trim().replace(/\/+$/, '') !== (baseURL ?? __API_ORIGIN__)

  const submit = () => {
    try {
      const normalized = normalizeBaseURL(value)
      setBaseURL(normalized)
      setValue(normalized ?? __API_ORIGIN__)
      setError(null)
    } catch {
      setError(t('apiBaseURLInvalid'))
    }
  }

  return (
    <div className={styles.cell}>
      <div className={styles.apiKey}>
        <div className={styles.label}>{t('apiBaseURL')}</div>
        <div className={styles.apiKeyInput}>
          <input
            type="url"
            placeholder={__API_ORIGIN__}
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setError(null)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                submit()
              }
            }}
          />
          {dirty ? (
            <>
              <span className={styles.divider} />
              <button
                type="button"
                className={styles.confirm}
                onMouseDown={(event) => event.preventDefault()}
                onClick={submit}
              >
                {t('confirm')}
              </button>
            </>
          ) : null}
        </div>
        {error ? <div className={styles.error}>{error}</div> : null}
      </div>
    </div>
  )
}
