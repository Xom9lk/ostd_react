/**
 * Created by Игорь on 07.01.2016.
 */

var routerSing = null;
exports.set = router => routerSing = router;
exports.get = () => routerSing;