// TODO extpected, hoped or guessed?
function getData(peaVariants, numTrials, peasPerTrial, userHopes) {
    const data = []
    for (let i=0; i < numTrials; i++) {
      data.push(
        getTrial(peaVariants, peasPerTrial, userHopes)
      )
    }
    return data
}

// TODO no need for this function
function sortedDataBySuccess(data)  {
  return data.map(sortedTrialBySuccess)
}

function getTrial(peaVariants, numPeas, userHopes) {
  const trial = {
    'actual': getRandomPeas(peaVariants, numPeas),
    'expected': getExpectedPeas(userHopes),
  }
  trial.successRate = getTrialSuccessRate(trial)
  return trial
}

function sortedTrialBySuccess(trial) {
  const peaCounts = getTrialPeaCounts(trial)
  let redundunt = []

  let redunduntVarCount
  for (let peaVariant of Object.keys(peaCounts.expected)) {
    redunduntVarCount = peaCounts.expected[peaVariant] -
                        (peaCounts.actual[peaVariant] || 0)
    if (redunduntVarCount <= 0) {continue}
    redundunt = redundunt.concat(Array(redunduntVarCount).fill().map(
      () => getPea(peaVariant, 'hopes')
    ))
  }
  let sortedExpected = []
  let peaVariant
  for (let actualPea of trial.actual) {
    peaVariant = actualPea.variant
    if (peaCounts.expected[peaVariant] > 0) {
      sortedExpected.push(getPea(peaVariant, 'hopes', true))
      peaCounts.expected[peaVariant]--
    } else {
      sortedExpected.push(redundunt.pop())
    }
  }
  sortedExpected = [...sortedExpected, ...redundunt]
  return {
    ...trial, expected: sortedExpected,
  }
}


function sortedTrialByMatching(trial) {
  let compareExpectedPeas = (p1, p2) => {
    let needed1 = Boolean(p1.provedNeeded)
    let needed2 = Boolean(p2.provedNeeded)
    if (p1 === p2) {return 0}
    return needed1 > needed2? -1 : 1
  }
  const expected = trial.expected.slice()
  const actual = trial.actual.slice()
    .map((pea, index) => [pea, index])
    .sort((p1, p2) => compareExpectedPeas(expected[p1[1]], expected[p2[1]]))
    .map(p => p[0])
  expected.sort(compareExpectedPeas)
  return {
    ...trial, expected: expected, actual: actual
  }
}

function getTrialSuccessRate(trial) {
  const counts = getTrialPeaCounts(trial)
  let unhappyCount = 0, varUnhappyCount, varExpectedCount
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

function getTrialPeaCounts (trial) {
  // TODO ensure that both actual and expected always have the
  // same keys
  const counts = {
    actual: {}, expected: {},
  }
  let currActualVar, currExpectedVar
  for (let i=0; i < trial.actual.length; i++) {
    currActualVar = trial.actual[i]['variant']
    counts.actual[currActualVar] ?
      counts.actual[currActualVar]++ :
      counts.actual[currActualVar] = 1
    currExpectedVar = trial.expected[i]['variant']
    counts.expected[currExpectedVar] ?
      counts.expected[currExpectedVar]++ :
      counts.expected[currExpectedVar] = 1
  }
  return counts
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

// todo split to real and imagened peas
function getPea(variant, existsIn, provedNeeded) {
  // existIn: future, present, hopes
  return {
    variant: variant, existsIn: existsIn, provedNeeded: provedNeeded
  }
}

export {getData, sortedDataBySuccess, sortedTrialByMatching};
