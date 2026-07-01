document.addEventListener('DOMContentLoaded', function () {
  var starNodes = document.querySelectorAll('.js-github-stars[data-url]');

  starNodes.forEach(function (node) {
    var match = node.dataset.url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!match) return;

    fetch('https://api.github.com/repos/' + match[1] + '/' + match[2])
      .then(function (response) {
        if (!response.ok) throw new Error('GitHub API request failed');
        return response.json();
      })
      .then(function (repo) {
        if (typeof repo.stargazers_count === 'number') {
          node.textContent = repo.stargazers_count.toLocaleString();
        }
      })
      .catch(function () {
        // Keep the static fallback value rendered by Hexo.
      });
  });
});
