
export function markSuccessfullReport() {
    localStorage.setItem('SuccessfullReport', Date.now().toString())
}

export function hadSuccessFullReportToday(): boolean {
    const lastReportTimeStr = localStorage.getItem('SuccessfullReport');
    if (lastReportTimeStr === null) {
        return false;
    }
    const lastReportTime = parseInt(lastReportTimeStr);
    return true;
}