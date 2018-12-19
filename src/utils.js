export function match_text(input_text, pattern, flags) {
  var re = new RegExp(pattern, flags)
  return re.exec(input_text)
}
