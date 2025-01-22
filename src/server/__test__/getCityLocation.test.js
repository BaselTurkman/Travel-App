const { getCityLocation } = require('../getCityLocation');
describe('getCityLocation', () => {
    // Mock fetch globally
    beforeEach(() => {
        global.fetch = jest.fn(); 
    });
    // Reset mocks after each test
    afterEach(() => {
        jest.resetAllMocks();
    });
    test('should return correct location data for a valid city', async () => {
        const mockResponse = {
            postalCodes: [
                {
                    placeName: 'London',
                    lat: 51.509865,
                    lng: -0.118092,
                },
            ],
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
        const result = await getCityLocation('London', 'testuser');
        expect(result).toEqual({
            lat: 51.509865,
            lng: -0.118092,
            city: 'London',
        });
    });
    test('should return error message if city is not found', async () => {
        const mockResponse = { postalCodes: [] };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
        const result = await getCityLocation('UnknownCity', 'testuser');
        expect(result).toEqual({
            msg: 'City Not Found, Please Make sure the Spelling',
            error: true,
        });
    });
    test('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));
        const result = await getCityLocation('London', 'testuser');
        expect(result).toEqual({
            msg: 'Network error',
            error: true,
        });
    });
});
