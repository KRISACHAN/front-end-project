export async function fetchData() {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      message: 'This data was fetched asynchronously',
      timestamp: new Date().toISOString()
    }
  }
