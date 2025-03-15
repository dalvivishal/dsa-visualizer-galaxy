
// BFS code snippets
export const bfsSnippets = [
  {
    id: 'bfsInit',
    code: 'function bfs(graph, startNode) {',
    description: 'Starting the BFS function'
  },
  {
    id: 'bfsVisited',
    code: '  const visited = new Set();',
    description: 'Initialize set to track visited nodes'
  },
  {
    id: 'bfsQueue',
    code: '  const queue = [startNode];',
    description: 'Initialize queue with the starting node'
  },
  {
    id: 'bfsResult',
    code: '  const result = [];',
    description: 'Initialize array to store traversal result'
  },
  {
    id: 'bfsVisitStart',
    code: '  visited.add(startNode);',
    description: 'Mark the starting node as visited'
  },
  {
    id: 'bfsWhile',
    code: '  while (queue.length > 0) {',
    description: 'Continue until queue is empty'
  },
  {
    id: 'bfsDequeue',
    code: '    const currentNode = queue.shift();',
    description: 'Dequeue the next node'
  },
  {
    id: 'bfsProcess',
    code: '    result.push(currentNode);',
    description: 'Process the current node'
  },
  {
    id: 'bfsNeighbors',
    code: '    for (const neighbor of graph[currentNode]) {',
    description: 'Loop through all neighbors'
  },
  {
    id: 'bfsCheck',
    code: '      if (!visited.has(neighbor)) {',
    description: 'Check if neighbor has been visited'
  },
  {
    id: 'bfsEnqueue',
    code: '        queue.push(neighbor);',
    description: 'Enqueue the unvisited neighbor'
  },
  {
    id: 'bfsVisitNeighbor',
    code: '        visited.add(neighbor);',
    description: 'Mark the neighbor as visited'
  },
  {
    id: 'bfsCloseIf',
    code: '      }',
    description: ''
  },
  {
    id: 'bfsCloseNeighbors',
    code: '    }',
    description: 'End of neighbors loop'
  },
  {
    id: 'bfsCloseWhile',
    code: '  }',
    description: 'End of BFS while loop'
  },
  {
    id: 'bfsReturn',
    code: '  return result;',
    description: 'Return the traversal result'
  },
  {
    id: 'bfsEnd',
    code: '}',
    description: 'End of BFS function'
  }
];

// Dijkstra's algorithm code snippets
export const dijkstraSnippets = [
  {
    id: 'dijkstraInit',
    code: 'function dijkstra(graph, startNode) {',
    description: 'Starting the Dijkstra algorithm function'
  },
  {
    id: 'dijkstraDistances',
    code: '  const distances = {};',
    description: 'Object to store distances from start node'
  },
  {
    id: 'dijkstraPrevious',
    code: '  const previous = {};',
    description: 'Object to store previous nodes'
  },
  {
    id: 'dijkstraNodes',
    code: '  const nodes = new Set(Object.keys(graph));',
    description: 'Set of all nodes in the graph'
  },
  {
    id: 'dijkstraInitNodes',
    code: '  // Initialize all distances to Infinity except start node',
    description: 'Set up initial distances'
  },
  {
    id: 'dijkstraForInit',
    code: '  for (const node of nodes) {',
    description: 'Loop through all nodes'
  },
  {
    id: 'dijkstraSetDistance',
    code: '    distances[node] = node === startNode ? 0 : Infinity;',
    description: 'Start node is 0, all others are Infinity'
  },
  {
    id: 'dijkstraCloseFor',
    code: '  }',
    description: 'End of initialization loop'
  },
  {
    id: 'dijkstraWhile',
    code: '  while (nodes.size > 0) {',
    description: 'Continue until all nodes are processed'
  },
  {
    id: 'dijkstraGetClosest',
    code: '    // Find closest node',
    description: 'Find the node with smallest distance'
  },
  {
    id: 'dijkstraMinInit',
    code: '    let smallestDistance = Infinity;',
    description: 'Initialize smallest distance'
  },
  {
    id: 'dijkstraClosestNode',
    code: '    let closestNode = null;',
    description: 'Initialize closest node'
  },
  {
    id: 'dijkstraFindMin',
    code: '    for (const node of nodes) {',
    description: 'Loop through unvisited nodes'
  },
  {
    id: 'dijkstraCompare',
    code: '      if (distances[node] < smallestDistance) {',
    description: 'Compare distances'
  },
  {
    id: 'dijkstraUpdateMin',
    code: '        smallestDistance = distances[node];',
    description: 'Update smallest distance'
  },
  {
    id: 'dijkstraUpdateNode',
    code: '        closestNode = node;',
    description: 'Update closest node'
  },
  {
    id: 'dijkstraCloseMinIf',
    code: '      }',
    description: ''
  },
  {
    id: 'dijkstraCloseMinFor',
    code: '    }',
    description: 'End of finding minimum'
  },
  {
    id: 'dijkstraCheckEnd',
    code: '    if (closestNode === null || distances[closestNode] === Infinity) {',
    description: 'Break if no path exists'
  },
  {
    id: 'dijkstraBreak',
    code: '      break;',
    description: 'No more reachable nodes'
  },
  {
    id: 'dijkstraCloseCheck',
    code: '    }',
    description: ''
  },
  {
    id: 'dijkstraRemoveNode',
    code: '    nodes.delete(closestNode);',
    description: 'Remove closest node from unvisited set'
  },
  {
    id: 'dijkstraCheckNeighbors',
    code: '    // Check all neighbors',
    description: 'Update distances to neighbors'
  },
  {
    id: 'dijkstraNeighborLoop',
    code: '    for (const neighbor in graph[closestNode]) {',
    description: 'Loop through neighbors of closest node'
  },
  {
    id: 'dijkstraCalcDistance',
    code: '      const distance = distances[closestNode] + graph[closestNode][neighbor];',
    description: 'Calculate new distance'
  },
  {
    id: 'dijkstraCompareDistance',
    code: '      if (distance < distances[neighbor]) {',
    description: 'Check if new path is shorter'
  },
  {
    id: 'dijkstraUpdateDistance',
    code: '        distances[neighbor] = distance;',
    description: 'Update the distance'
  },
  {
    id: 'dijkstraUpdatePrevious',
    code: '        previous[neighbor] = closestNode;',
    description: 'Update the previous node'
  },
  {
    id: 'dijkstraCloseUpdateIf',
    code: '      }',
    description: ''
  },
  {
    id: 'dijkstraCloseNeighborLoop',
    code: '    }',
    description: 'End of neighbors loop'
  },
  {
    id: 'dijkstraCloseWhile',
    code: '  }',
    description: 'End of main loop'
  },
  {
    id: 'dijkstraReturn',
    code: '  return { distances, previous };',
    description: 'Return distances and paths'
  },
  {
    id: 'dijkstraEnd',
    code: '}',
    description: 'End of Dijkstra function'
  }
];
