var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: 'Prohibit adding work items in future',
  guard: function(ctx) {
    return ctx.issue.workItems.added.isNotEmpty();
  },
  action: function(ctx) {
    ctx.issue.workItems.added.forEach(function(item) {
      var itemDate = new Date(item.date).setUTCHours(0, 0, 0, 0);
      var today = new Date().setUTCHours(0, 0, 0, 0);
      workflow.check(itemDate <= today,
        'Adding work items in future is not allowed!');
    });
  },
  requirements: {}
});