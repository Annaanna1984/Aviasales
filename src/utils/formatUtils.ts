export const formatDuration = (duration: number) => {
    const hours = padTime(Math.floor(duration / 60));
    const minutes = padTime(duration % 60);
    return `${hours}ч ${minutes}м`;
};

export const formatDate = (date: Date, duration: number) => {
    const newDate = new Date(date);
    const endDate = new Date(newDate.getTime() + duration * 60000);
    return `${padTime(newDate.getHours())}:${padTime(newDate.getMinutes())} -
            ${padTime(endDate.getHours())}:${padTime(endDate.getMinutes())}`;
};

const padTime = (num: number): string => {
    return num.toString().padStart(2, '0');
};
