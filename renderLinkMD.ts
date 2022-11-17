export const renderLinkMD = (text: string, url: string) => `[${text}](${url})`

export const renderLinkPlainMD = (url: string) => renderLinkMD(url, url)
