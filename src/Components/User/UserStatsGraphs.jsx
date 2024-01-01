import React from 'react'
import { VictoryBar, VictoryChart, VictoryPie } from 'victory'
import styles from './UserStatsGraphs.module.css'

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([])
  const [total, setTotal] = React.useState(0)

  React.useEffect(() => {
    setGraph(
      data.map((item) => ({
        x: item.title,
        y: Number(item.acessos),
      }))
    )

    setTotal(data.map(({ acessos }) => Number(acessos)).reduce((sum, current) => sum + current, 0))
  }, [data])

  return (
    <section className={`animeLeft ${styles.graph}`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{ data: { fillOpacity: 0.9, stroke: '#fff', strokeWidth: 2 }, labels: { fontSize: 14, fill: '#333' } }}
        />
      </div>

      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar data={graph} alignment='start' />
        </VictoryChart>
      </div>
    </section>
  )
}

export default UserStatsGraphs
