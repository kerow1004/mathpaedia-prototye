CREATE (primeNumberAndCompositeNumber:Concept {name: 'prime number and composite number', level: 4})
CREATE (basicPower:Concept {name: 'basic power', level: 4})
CREATE (primeFactorization:Concept {name: 'prime factorization', level: 4})
CREATE (commonDivisorAndGreatestCommonDivisor:Concept {name: 'common divisor and greatest common divisor', level: 4})
CREATE (commonMultipleAndLeastCommonMultiple:Concept {name: 'common multiple and least common multiple', level: 4})
CREATE (relationOfGCDAndLCM:Concept {name: 'relation of G.C.D and L.C.M', level: 4})
CREATE
    (commonDivisorAndGreatestCommonDivisor)-[:AFFECT]->(relationOfGCDAndLCM),
    (commonMultipleAndLeastCommonMultiple)-[:AFFECT]->(relationOfGCDAndLCM),
    (primeFactorization)-[:AFFECT]->(commonDivisorAndGreatestCommonDivisor),
    (primeFactorization)-[:AFFECT]->(commonMultipleAndLeastCommonMultiple),
    (primeNumberAndCompositeNumber)-[:AFFECT]->(primeFactorization),
    (basicPower)-[:AFFECT]->(primeFactorization)