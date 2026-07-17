export const generateTrackingId = () => {
    const timestamp = Date.now().toString(36).slice(-6);  
    const random = Math.floor(100 + Math.random() * 900);
    return `IND-TRK-${timestamp}${random}`;
}