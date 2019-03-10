function storeUserId(userId: string) {
  localStorage.setItem('userId', userId);
}

function loadUserId(): string {
  return localStorage.getItem('userId');
}

export async function getUserId(): Promise<string> {
  const cachedUserId = loadUserId();
  if (cachedUserId) {
    return cachedUserId;
  }

  const userId = await extractUserIdFromHomepage();
  if (userId) {
    storeUserId(userId);
    return userId;
  }
}

async function extractUserIdFromHomepage(): Promise<string> {
  const options = {
    method: 'POST'
  };
  const res = await fetch(`https://app.meckano.co.il`, options);
  if (res.status === 200) {
    const text = await res.text();
    const matchResult = text.match(
      /Application\.initialize\('\/api\/\', ?{"id":(\d*), ?"email"/m
    );
    if (matchResult !== null && matchResult.length >= 1) {
      const userId = matchResult[1];
      console.log('Found account Id:', userId);
      return userId;
    }
  }
}
