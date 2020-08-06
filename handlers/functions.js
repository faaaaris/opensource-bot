module.exports = {
    resolveMember: function(message, toFind = "") {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if (!target && message.mentions.members) {
            target = message.mentions.members.first();
        };

        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return (
                    member.user.username.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
                );
            });

            if (!target) return null;

            return target
        }
    }
}