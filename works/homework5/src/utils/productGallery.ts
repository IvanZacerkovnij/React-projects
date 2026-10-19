export function getPreviousImageIndex(currentIndex: number, imageCount: number): number {
    if (imageCount <= 0) return 0;
    return (currentIndex - 1 + imageCount) % imageCount;
}

export function getNextImageIndex(currentIndex: number, imageCount: number): number {
    if (imageCount <= 0) return 0;
    return (currentIndex + 1) % imageCount;
}
