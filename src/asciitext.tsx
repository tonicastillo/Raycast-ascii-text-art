import React, { useEffect, useState } from "react";
import { List, getPreferenceValues, ActionPanel } from '@raycast/api'
import { ResultItem} from "./types";

import fontList from '../assets/fontList.json'


import Font from "ascii-art-font";

interface StateInterface {
  items?: ResultItem[];
}


const AsciiText =  () => {
  const [state, setState] = React.useState<StateInterface>({});

  const fontPath:string =  __dirname + "/assets/fonts/";
  Font.fontPath = fontPath

    const updateList = (text:string) => {

      const tItems: ResultItem[] = []
      if(text.length > 0){
        fontList.fonts.map(fontName => {
          Font.create(`${text}`, fontName, (err:string, result:string) => {
            tItems.push({
              fontName: fontName,
              art: result,
              err: err
            });
          });
        })
      }
      setState({items: tItems})
    }
    return (
      <List
        // aspectRatio="16/9"
        // columns={3}
        // inset={Grid.Inset.Zero}
        isLoading={!state?.items}
        // filtering={false}
        navigationTitle="Generate ASCII text"
        searchBarPlaceholder="Make art..."
        onSearchTextChange={updateList}
        isShowingDetail
      >
        {state?.items && state.items?.map((item, idx) => {
          const lines = item.art.split('\n')
          const cleanedString = lines.map(line => line.substring(0,22)).join('\n')
          const asciiText:string = "```\n\n" + cleanedString + "\n```"
          console.log(asciiText)
          return (
            <List.Item
              key={idx}
              title={item.fontName}
              detail={
                <List.Item.Detail markdown={asciiText} />
              }
            />
          )})
        }
      </List>
    )

}
// <Grid
//   aspectRatio="16/9"
//   columns={3}
//   inset={Grid.Inset.Zero}
//   isLoading={!state?.items}
//   filtering={false}
//   navigationTitle="Generate ASCII text"
//   searchBarPlaceholder="Write your text..."
//   onSearchTextChange={updateList}
// >
//   {state?.items && state.items?.map((item, idx) => {
//
//     const imgSource:string = gridImageFromText(item.art)
//     return (
//       <Grid.Item
//         key={idx}
//         title={item.fontName}
//         content={imgSource}
//       />
//     )})
//   }
// </Grid>
export default AsciiText