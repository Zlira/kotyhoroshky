// BunchOfTrials
   // options
   // userGuess
   // numTrials
   // peasPerTrial
   // beforeTrailStart
   // sorted
   // - successRate
// Trail
   // options
   // userGuess
   // numPeas
   // beforeTrailStart
   // sorted
   // - successRate
// Pea
   // peaVariant
   // exists (actual/expected)
   // isHappy
function getData(peaVariants, numTrials, peasPerTrial, userHopes) {
    const data = []
    for (let i=0; i < numTrials; i++) {
      data.push(
        getTrial(peaVariants, peasPerTrial, userHopes)
      )
    }
    return data
}

function getTrial(peaVariants, numPeas, userHopes) {
  const trial = {
    'actual': getRandomPeas(peaVariants, numPeas),
    'expected': getExpectedPeas(userHopes),
  }
  trial.successRate = getTrialSuccessRate(trial)
  return trial
}

function getTrialSuccessRate(trial) {
  // todo split the function
  const counts = {
    actual: {}, expected: {},
  }
  let actualVar, expectedVar, unhappyCount = 0,
    varUnhappyCount, varExpectedCount
  for (let i=0; i < trial.actual.length; i++) {
    actualVar = trial.actual[i]['variant']
    counts.actual[actualVar] ?
      counts.actual[actualVar]++ :
      counts.actual[actualVar] = 1
    expectedVar = trial.expected[i]['variant']
    counts.expected[expectedVar] ?
      counts.expected[expectedVar]++ :
      counts.expected[expectedVar] = 1
  }
  for (let peaVar of Object.keys(counts.actual)) {
    varExpectedCount = counts.expected[peaVar] || 0
    varUnhappyCount = counts.actual[peaVar] - varExpectedCount
    if (varUnhappyCount > 0) {unhappyCount += varUnhappyCount}
  }
  return unhappyCount / trial.actual.length
}

function getExpectedPeas(userHopes) {
  let peas = []
  for (let peaVar of Object.keys(userHopes)) {
    peas = peas.concat(
      Array(userHopes[peaVar]).fill(getPea(peaVar, 'hopes'))
    )
  }
  return peas
}

function getRandomPeas(variants, num) {
  const step = 1 / variants.length
  return Array(num).fill(undefined).map(
    () => {
      const varIndex = Math.floor(Math.random() / step)
      return getPea(variants[varIndex], 'present')
    }
  )

}

function getPea(variant, existsIn, isHappy) {
  // existIn: future, present, hopes
  return {
    variant: variant, existsIn: existsIn, isHappy: isHappy
  }
}

export {getData};
