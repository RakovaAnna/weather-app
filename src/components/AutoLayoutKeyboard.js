const replacerRu = {
    "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
    "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
    "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
    ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
    "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
};

const replacerEn = {
    "й":"q", "ц":"w", "у":"e", "к":"r", "е":"t", "н":"y", "г":"u",
    "ш":"i", "щ":"o", "з":"p", "х":"[", "ъ":"]", "ф":"a", "ы":"s",
    "в":"d", "а":"f", "п":"g", "р":"h", "о":"j", "л":"k", "д":"l",
    "ж":";", "э":"'", "я":"z", "ч":"x", "с":"c", "м":"v", "и":"b",
    "т":"n", "ь":"m", "б":",", "ю":".", ".": "/"
};

export function ruLayoutKeyboard(str) {
    return str.replace(/[A-z/,.;\'\]\[]/g, function (x) {
        return x == x.toLowerCase() ? replacerRu[x] : replacerRu[x.toLowerCase()].toUpperCase();
    });
}

export function enLayoutKeyboard(str) {
    return str.replace(/[А-я/,.;\'\]\[]/g, function (x) {
        return x == x.toLowerCase() ? replacerEn[x] : replacerEn[x.toLowerCase()].toUpperCase();
    });
}
