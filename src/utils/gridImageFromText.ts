
function gridImageFromText(markdown: string): string{
  let svgString:string = String(`
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <defs></defs>
      <text style="fill: #1d1d1d; font-family: Monaco; font-size: 16px; white-space: pre;">
  `)
    markdown.split("/n").map((line) => {
      svgString += `<tspan x="0" y="1em">${line}</tspan>`
    })
  svgString += `</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${svgString.replace('/n','')}`
}

export default gridImageFromText
