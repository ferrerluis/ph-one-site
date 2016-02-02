from flask import request, jsonify, abort, render_template
from JsonFlask import JsonFlask
from models import *
import re
import sys

app = JsonFlask(__name__)

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/rsvp', methods=['POST', 'GET'])
def rsvp():
	method = request.method

	if method == 'GET':
		return render_template('rsvp.html')

	elif method == 'POST':
		json = request.get_json(force=True)
		print json

		try:
			roles_info = json.pop('roles')
		except KeyError:
			roles_info = []

		member_info = json

		if '' in member_info.values():
			abort(400, 'Form was not completed')

		for key in member_info:
			member_info[key] = member_info[key].strip().lower()

		member_info['phone'] = re.sub('[^0-9+]', '', member_info['phone'])

		if len(member_info['phone']) < 10 or len(member_info['phone']) > 12:
			abort(400, 'Invalid phone number')

		if not re.match('^...+@(student\.)?gsu\.edu$', member_info['email']):
			abort(400, 'Invalid GSU email')

		if not roles_info:
			abort(400, 'Select at least one role')

		try:
			member = Member.create(**member_info)
			roles = [Role.create(name=name, member=member) for name in roles_info]

		except Exception as err:
			abort(400, str(err))

		resp = jsonify(request.get_json(force=True))
		resp.status_code = 200

		return resp

	else:
		abort(405)

if __name__ == '__main__':
	sys.stdout.flush()
	app.run(host='0.0.0.0', port=80)
