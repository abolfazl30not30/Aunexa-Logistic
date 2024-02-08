export const EnglishToPersian = (input) => {
    const persianNumbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return input?.replace(/[0-9]/g, function(w){
        return persianNumbers[+w]
    });
}