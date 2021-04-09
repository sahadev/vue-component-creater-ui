export function checkIsDataDirectives(key) {
    return [
        ':prop',
        'v-for',
        ':data',
        ':src',
        ':model',
        ':rules',
        ':total',
        ':current-page',
        'v-model',
        'v-if',
        ':reverse',
        ':show-file-list',
        ':file-list'].includes(key) ||  /^:+/g.test(key);
}

export function checkIsMethodDirectives(key) {
    return [
        ':before-close',
        ':on-preview',
        ':on-remove',
        ':before-remove',
        ':on-exceed',
        ':on-success',
        ':format',
        ':before-upload'].includes(key);
}