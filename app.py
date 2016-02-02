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

		for key in member_info:
			member_info[key] = member_info[key].strip()

		member_info['phone'] = re.sub('[^0-9+]', '', member_info['phone'])

		if len(member_info['phone']) < 10 or len(member_info['phone']) > 12:
			print 'Phone not valid'
			abort(400, 'Phone number is not valid')

		if not re.match('^...+@(student\.)?gsu\.edu$', member_info['email']):
			print 'Email not valid'
			abort(400, 'Email is not valid')

		if not roles_info:
			print 'No roles listed'
			abort(400, 'No roles listed')

		try:
			member = Member.create(**member_info)
			roles = [Role.create(name=name, member=member) for name in roles_info]

		except Exception as err:
			print str(err) + 'Some error'
			abort(400, 'Other error: ' + str(err))

		resp = jsonify(request.get_json(force=True))
		resp.status_code = 200

		return resp

	else:
		abort(405)

if __name__ == '__main__':
	sys.stdout.flush()
	app.run(host='0.0.0.0')
