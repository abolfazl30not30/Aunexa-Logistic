export const PersianToEnglish = (input) => {
    return input.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
}