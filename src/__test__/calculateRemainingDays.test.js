const { calculateRemainingDays } = require('../client/js/RemainingDays');

test('should return 0 for the current date', () => {
    const now = new Date();
    const remainingDays = calculateRemainingDays(now);
    expect(remainingDays).toBe(0); // Should be close to 0, allow for slight variations based on time of execution
});

test('should return a positive number for a future date', () => {
    const futureDate = new Date("2025-01-17");
    const remainingDays = calculateRemainingDays(futureDate);
    
    // Calculate the expected remaining days
    const expectedDays = Math.ceil((futureDate - new Date()) / (1000 * 3600 * 24));
    
    expect(remainingDays).toBe(expectedDays); // Compare the result with the expected value
});

test('should return a negative number for a past date', () => {
    const pastDate = new Date("2020-01-17");
    const remainingDays = calculateRemainingDays(pastDate);
    
    // Calculate the expected remaining days
    const expectedDays = Math.ceil((pastDate - new Date()) / (1000 * 3600 * 24));
    
    expect(remainingDays).toBe(expectedDays); // Compare the result with the expected value
});
