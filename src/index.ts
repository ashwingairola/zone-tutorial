import 'zone.js';

const zone = Zone.current;
const myZone = zone.fork({
	name: 'myZone',
	onScheduleTask(parentZoneDelegate, _currentZone, targetZone, task) {
		console.log('New task is scheduled:', task.type, task.source);
		return parentZoneDelegate.scheduleTask(targetZone, task);
	},
	onInvokeTask(
		parentZoneDelegate,
		_currentZone,
		targetZone,
		task,
		applyThis,
		applyArgs
	) {
		console.log('Task will be invoked:', task.type, task.source);
		return parentZoneDelegate.invokeTask(
			targetZone,
			task,
			applyThis,
			applyArgs
		);
	},
	onHasTask(parentZoneDelegate, _currentZone, targetZone, hasTaskState) {
		console.log('Task state changed in the zone:', hasTaskState);
		return parentZoneDelegate.hasTask(targetZone, hasTaskState);
	},
	onInvoke(
		parentZoneDelegate,
		_currentZone,
		targetZone,
		callback,
		applyThis,
		applyArgs
	) {
		console.log('The callback will be invoked:', callback);
		return parentZoneDelegate.invoke(
			targetZone,
			callback,
			applyThis,
			applyArgs
		);
	},
});

myZone.run(() => {
	setTimeout(() => {
		console.log('Timeout callback is invoked.');
	});

	Promise.resolve(1).then(() => {
		console.log('Promise resolve callback 1 called.');
	});

	Promise.resolve(2).then(() => {
		console.log('Promise resolve callback 2 called.');
	});
});

console.log(zone);
