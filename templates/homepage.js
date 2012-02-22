t.doctype('html5'),
t.html([
	t.head([
		t.el('title', 'Page Title'),
		t.getHead()
	]),
	t.body([
		t.el('header', [
			t.el('h1', {
				'class':'heading1',
				'data-lol':'lolz'
			}, 'COOL MANs'),
			t.el('p', 'Atqui plurium venenosamque.'),
			t.el('p', t.superEmphasise('Holy moly wow')),
			t.el('p', 'Naufrago credis ei Taliarchum.')
		]),
	]),
])