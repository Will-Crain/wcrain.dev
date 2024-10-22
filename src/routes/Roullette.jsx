import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const Roulette = ({ description, data, minL, maxL }) => {
  const svgRef = useRef(null)
  const radius = window.innerHeight * 0.4
  let wheelAngle = 0
  let ballAngle = 0
  let angleToSpinWheel = 0
  const ballUpTime = 0
  const ballDownTime = 2
  const spinUpTime = 1
  const spinDownTime = 3
  const wheelSpeed = 1
  const ballSpeed = 0.1

  const colors = {
    red: '#E0080B',
    black: '#000000',
    green: '#016D29',
  }

  const colorOrder = [colors.red, colors.black, colors.green]
  const pockets = []

  const build = () => {
    // Create pockets
    let nFullIter = Math.floor(data / (maxL - minL + 1))
    let labelArray = []
    for (let i = 0;i < nFullIter;i++) {
      for (let j = minL;j <= maxL;j++) {
        labelArray.push(j)
      }
    }

    let remainder = data - nFullIter * (maxL - minL + 1)
    for (let i = 0;i < remainder;i++) {
      labelArray.push(Math.ceil(Math.random() * (maxL - minL) + minL))
    }

    let rLabelArray = labelArray.sort(() => 0.5 - Math.random())

    for (let n = 0;n < data;n++) {
      pockets.push({
        type: n % 2,
        label: rLabelArray[n],
      })
    }

    pockets.unshift({ type: 2, label: '0' })
    pockets.splice(data / 2 + 1, 0, { type: 2, label: '0' })

    draw()
  }

  const draw = () => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear any existing svg content

    const windowSize = svg.node().getBoundingClientRect()
    const arcWidth = (Math.PI * 2) / pockets.length
    let prevAngle = (-1 * arcWidth) / 2 + wheelAngle

    const container = svg
      .append('g')
      .attr(
        'transform',
        `translate(${windowSize.width / 2 - radius}, ${windowSize.height / 2 - radius
        }) rotate(${angleToSpinWheel})`
      )
      .attr('transform-origin', `${radius} ${radius}`)

    for (let i = 0;i < pockets.length;i++) {
      const outerArc = d3
        .arc()
        .innerRadius(radius * (3 / 4))
        .outerRadius(radius)
        .startAngle(prevAngle)
        .endAngle(prevAngle + arcWidth)

      const innerArc = d3
        .arc()
        .innerRadius(radius * (2 / 4))
        .outerRadius(radius * (3 / 4))
        .startAngle(prevAngle)
        .endAngle(prevAngle + arcWidth)

      const textArc = d3
        .arc()
        .innerRadius(radius * (27 / 32))
        .outerRadius(radius * (27 / 32))
        .startAngle(prevAngle)
        .endAngle(prevAngle + arcWidth)

      container
        .append('path')
        .attr('d', outerArc)
        .style('fill', colorOrder[pockets[i].type])
        .attr('transform', `translate(${radius}, ${radius})`)

      container
        .append('path')
        .attr('d', innerArc)
        .style('fill', d3.rgb(colorOrder[pockets[i].type]).darker())
        .style('stroke', 'white')
        .style('stroke-width', 4)
        .attr('transform', `translate(${radius}, ${radius})`)

      container
        .append('path')
        .attr('d', textArc)
        .style('fill', 'none')
        .style('stroke', 'none')
        .attr('transform', `translate(${radius}, ${radius})`)

      container
        .append('text')
        .style('font', `${radius / 4}px arial`)
        .style('text-anchor', 'middle')
        .style('fill', 'white')
        .append('textPath')
        .attr('startOffset', '25%')
        .text(pockets[i].label)
        .attr('transform', `translate(${radius}, ${radius})`)

      prevAngle += arcWidth
    }

    container
      .append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', radius * (3 / 4))
      .style('fill', 'none')
      .style('stroke', '#777')
      .style('stroke-width', 4)

    container
      .append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', radius * (2 / 4))
      .style('fill', '#00000066')
      .style('stroke', 'white')
      .style('stroke-width', 3)

    container
      .append('circle')
      .attr('cx', radius + radius * (5 / 8) * Math.cos(ballAngle))
      .attr('cy', radius + radius * (5 / 8) * Math.sin(ballAngle))
      .attr('r', 20)
      .style('fill', 'white')
  }

  useEffect(() => {
    build()
  }, [])

  return (
    <div>
      <h1>{description}</h1>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  )
}

export default Roulette