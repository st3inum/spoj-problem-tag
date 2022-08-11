// ==UserScript==
// @name         spoj score
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       steinum
// @match        https://spojscore.herokuapp.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=herokuapp.com
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	var spoj_user_id = 'steinum'
	fetch('https://raw.githubusercontent.com/st3inum/spoj-problem-tag/main/spoj.json')
		.then(res => res.json())
		.then(json => {
			fetch('https://vjudge.net/user/solveDetail/'.concat(spoj_user_id))
				.then(res => res.json())
				.then(vjudge => {
					var ac = {}
					var wa = {}
					var i = 0;
					if ('SPOJ' in vjudge.acRecords) {
						for (i = vjudge.acRecords.SPOJ.length - 1; i >= 0; i--) {
							ac[vjudge.acRecords.SPOJ[i]] = 1;
						}
					}
					if ('SPOJ' in vjudge.failRecords) {
						for (i = vjudge.failRecords.SPOJ.length - 1; i >= 0; i--) {
							wa[vjudge.failRecords.SPOJ[i]] = 1;
						}
					}
					var row = document.getElementsByTagName("tr")
					var n = row.length

					row[0].insertCell(0).outerHTML = "<th>Number</th>"
					row[0].insertCell(-1).outerHTML = "<th>Tag</th>"
					for (i = n - 1; i >= 1; i--) {
						var problem_id = row[i].getElementsByTagName('td')[1].innerHTML
						var tag = ' - '
						if (problem_id in json) {
							tag = json[problem_id]
						} else {
							tag = problem_id
						}
						row[i].insertCell(0).innerHTML = i
						row[i].insertCell(-1).innerHTML = tag
						if (problem_id in ac) {
							for (var j = row[i].getElementsByTagName('td').length - 1; j >= 0; j--) {
								row[i].getElementsByTagName('td')[j].setAttribute('bgcolor', '#5cb85c')
							}
						} else if (problem_id in wa) {
							for (j = row[i].getElementsByTagName('td').length - 1; j >= 0; j--) {
								row[i].getElementsByTagName('td')[j].setAttribute('bgcolor', '#f0ad4e')
							}
						}
					}
				})

		})
})();