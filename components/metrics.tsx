import React, { useContext, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChart = dynamic(() => (
    import("recharts").then(recharts => recharts.PieChart)), { ssr: false }
)

import { BilanContext, BilanItem } from './history';
import { categoryMapping } from './consts';
import styled from 'styled-components';

export interface Metrics {
    total_value: number;
    nb_items: number;
    by_category: { [category: number]: number };
}

const getMetrics = (items: BilanItem[]): Metrics => {
    let total_value = 0
    const nb_items = items.length
    const by_category: { [category: number]: number } = {}

    for (const item of items) {
        total_value += item.value
        if (!(item.category in by_category)) {
            by_category[item.category] = 0
        }
        by_category[item.category] += item.value
    }

    return { total_value, nb_items, by_category }
}

const getData = (metrics: Metrics) => Object.keys(metrics.by_category).map((key) => ({
    name: categoryMapping[key as any].name,
    value: metrics.by_category[key as any],
    fill: categoryMapping[key as any].color,
}))

const MetricsWrapper = styled.div`
    grid-area: metrics;
`

export const Metrics: React.FC = () => {
    const { items } = useContext(BilanContext)

    const metrics = useMemo(() => getMetrics(items), [items])

    const data = useMemo(() => getData(metrics), [metrics]);

    return (
        <MetricsWrapper>
            <div className="box">
                <h1 className="title">{metrics.total_value} kgCO2eq</h1>
                <ResponsiveContainer width="100%" minHeight="400px">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {/* {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))} */}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </MetricsWrapper>
    );
};
