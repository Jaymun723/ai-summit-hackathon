import React, { createContext, useContext, useState } from "react"
import styled from "styled-components"
import { categoryMapping } from "./consts"

export interface BilanItem {
    category: number
    description: string
    value: number
}

interface BilantCtx {
    items: BilanItem[]
    changeBilan: (items: BilanItem[]) => void
}

export const BilanContext = createContext({ items: [], changeBilan: () => { } } as BilantCtx)

export const BilanWrapper = (props: { children: React.ReactNode }) => {
    const [items, setItems] = useState([
        { category: 0, description: "Les lumières ont une consommation de 500kW/h et fonctionnent pendant 6h.", value: 6 * 500 * 1.3 },
        { category: 1, description: "Yas", value: 700 },
        { category: 1, description: "No", value: 5000 },
        { category: 4, description: "Oupsi", value: 1200 },
        { category: 3, description: "srdgfyrdfstcjesnvbgrdjemxnen,rhcvnksdghjkghjgnjmh", value: 1200 }
    ] as BilanItem[])

    return <BilanContext.Provider value={{ items, changeBilan: setItems }}>
        {props.children}
    </BilanContext.Provider>
}


const HistoryWrapper = styled.div`
    overflow-y: auto;
    grid-area: history;
`

const ListIem = styled.p<{ color: string }>`
    color: ${(props) => props.color};
`

export const History = () => {
    const { items } = useContext(BilanContext)


    return <HistoryWrapper className="box">
        {items.map(item =>
            <ListIem key={item.description} color={categoryMapping[item.category].color}>
                - {item.value}: {item.description}
            </ListIem>
        )}
    </HistoryWrapper>
}