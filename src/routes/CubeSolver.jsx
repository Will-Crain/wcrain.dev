import React from 'react'

const CubeSolver = () => {
    return (
        <div>CubeSolver</div>
    )
}

export default CubeSolver

class Cube {
    constructor (faces) {
        if (faces.length !== 6) return false

        let order = ['front', 'top', 'bottom', 'back', 'right', 'left']
        for (let faceIdx in faces) {
            this[order[faceIdx]] = faces[faceIdx]
        }

        return this
    }
}

class Face {
    constructor (blocks) {

        return this
    }
    getBlockFromCoordinate(column, row) {
        return this.blocks[row * 4 + column]
    }
}

class Block {
    constructor (cells) {

        return this
    }
}