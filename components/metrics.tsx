import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { BilanContext, BilanItem } from './bilan';
import { categoryMapping } from './consts';

export interface Metrics {
    total_value: number;
    nb_items: number;
    by_category: { [category: number]: number };
}

const getMetrics = (items: BilanItem[]): Metrics => {
    let total_value = 0
    const nb_items = items.length
    let by_category: { [category: number]: number } = {}

    for (const item of items) {
        total_value += item.value
        if (!(item.category in by_category)) {
            by_category[item.category] = 0
        }
        by_category[item.category] += item.value
    }

    // for (const category in by_category) {
    //     by_category[category] = by_category[category] / (100 * total_value)
    // }

    return { total_value, nb_items, by_category }
}

export const Metrics: React.FC = () => {
    const { items } = useContext(BilanContext)

    const metrics = useMemo(() => getMetrics(items), [items])

    const data = Object.keys(metrics.by_category).map((key, index) => ({
        name: categoryMapping[key as any].name,
        value: metrics.by_category[key as any],
        fill: categoryMapping[key as any].color,
    }));

    return (
        <div className="container">
            <div className="box">
                <h1 className="title">{metrics.total_value} kgCO2eq</h1>
                <PieChart width={400} height={400}>
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
            </div>
        </div>
    );
};
