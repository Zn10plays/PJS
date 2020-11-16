import _axios from 'axios'
const axios = _axios.create({
  baseURL: 'https://api.github.com'
})

export const listFilesInRepo = async (owner, repo, folder) => {
  const commits = await axios.get(`/repos/${owner}/${repo}/commits`)
  const commit = commits.data[0]
  const info = await axios.get(
    `/repos/${owner}/${repo}/git/commits/${commit.sha}`
  )
  const sha = info.data.sha
  const tree = await axios.get(`/repos/${owner}/${repo}/git/trees/${sha}`)
  if (!folder) {
    return tree.data
  } else {
    const f = tree.data.tree.find((value) => value.path === folder)
    const folderTree = await axios.get(f.url)
    return folderTree.data
  }
}
