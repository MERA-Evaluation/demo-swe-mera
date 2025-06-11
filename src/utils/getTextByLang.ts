import textData from '../data/textData.json';

// я не хотел прокидывать в параметры еще отдельно langSettings,
// но без него не происходят обновления по тексту, если просто передавать lang в ключ
export const getTextByLang = (key: string, langSettings: string) => {
    return textData[key]?.[langSettings] || '';
}