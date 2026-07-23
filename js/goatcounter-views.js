(function() {
  var endpoint = 'https://ajsonx.goatcounter.com/counter/';
  var visitors = document.querySelectorAll('.goatcounter_visitors');

  visitors.forEach(function(visitor) {
    var count = visitor.querySelector('.goatcounter-visitors-count');
    var path = visitor.id;

    if (!count || !path) return;

    fetch(endpoint + encodeURIComponent(path) + '.json')
      .then(function(response) {
        if (response.status === 404) return { count: '0' };
        if (!response.ok) throw new Error('GoatCounter request failed');
        return response.json();
      })
      .then(function(data) {
        count.textContent = data && data.count ? data.count : '0';
      })
      .catch(function() {
        count.textContent = '0';
      });
  });
})();
