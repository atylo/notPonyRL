TConfig.data[KEY_LANGUAGE][LANGUAGE_TECH] = function()
{

		/**
		 * 		Language
		 */

				// wrapper
	addLang('wrap.title'              , '<b class="type">%n</b><br />');
	addLang('wrap.achievement'        , '<div class="%c"><IMG SRC="images/achievements/%img.png" title="<b class=\'type\'>%title</b>%descr"></div>');
	addLang('wrap.achievement_reward' , '<br /> - %t: %d');
	
				// skills
	addLang('skills.description'  , '<b class="type">%n</b><br />%d');

	addLang('skills.img.' + SKILL_ATTACK, 'attack.png');
	addLang('skills.img.magic.' + SKILL_ATTACK, 'attack_magic.png');
	addLang('skills.img.' + SKILL_APPLEKINESIS, 'applekinesis.png');
	addLang('skills.img.' + SKILL_BLINK, 'blink.png');
	addLang('skills.img.' + SKILL_SHIELD, 'shield.png');
	addLang('skills.img.' + SKILL_EMPOWER, 'empower.png');
	addLang('skills.img.' + SKILL_FORCE, 'force.png');
	addLang('skills.img.' + SKILL_FORCE_PONY, 'push.png');
	addLang('skills.img.' + SKILL_FORCE_WAVE, 'force_wave.png');
	addLang('skills.img.' + SKILL_HEAL, 'heal.png');
	addLang('skills.img.' + SKILL_HOARD, 'hoard.png');
	addLang('skills.img.' + SKILL_MISSILE, 'fireball.png');
	addLang('skills.img.' + SKILL_STARE, 'stare.png');
	addLang('skills.img.' + SKILL_STONESKIN, 'stoneskin.png');
	addLang('skills.img.' + SKILL_WHINE, 'whine.png');

	addLang('skills.img.' + SKILL_TALISMAN_ENDURANCE, 'talisman_endurance.png');
	addLang('skills.img.' + SKILL_TALISMAN_SPIRITS, 'talisman_spirits.png');
	addLang('skills.img.' + SKILL_TALISMAN_WARRIOR, 'talisman_warrior.png');
	
	addLang('skills.img.' + SKILL_FROST_GENERAL, 'invocation/frost.png');
	addLang('skills.img.' + SKILL_FROST_ICEBORN, 'invocation/arcane.png');
	addLang('skills.img.' + SKILL_FROST_TOUCH, 'invocation/chaos.png');
	addLang('skills.img.' + SKILL_SANTA_BELLS, 'invocation/arcane.png');
	addLang('skills.img.' + SKILL_SANTA_REWARD, 'invocation/life.png');
	addLang('skills.img.' + SKILL_SANTA_STRONG, 'invocation/mana.png');
	
	addLang('skills.img.' + SKILL_RARITY_ARMOR, 'invocation/magic.png');
	addLang('skills.img.' + SKILL_RARITY_RESTOCK, 'invocation/arcane.png');
	addLang('skills.img.' + SKILL_RARITY_TOUCH, 'invocation/life.png');
	addLang('skills.img.' + SKILL_RARITY_GENEROSITY, 'invocation/sorcery.png');
	addLang('skills.img.' + SKILL_FLUTTERSHY_REMEDY, 'invocation/fluttershy_remedy.png');
	addLang('skills.img.' + SKILL_FLUTTERSHY_FORTITUDE, 'invocation/fluttershy_fortitude.png');
	addLang('skills.img.' + SKILL_FLUTTERSHY_PEACE, 'invocation/fluttershy_peace.png');
	addLang('skills.img.' + SKILL_TWILIGHT_AFFINITY, 'invocation/mana.png');
	addLang('skills.img.' + SKILL_TWILIGHT_RECHARGE, 'invocation/magic.png');
	addLang('skills.img.' + SKILL_TWILIGHT_MINDLINK, 'invocation/nature.png');
	addLang('skills.img.' + SKILL_TWILIGHT_LEAK, 'invocation/sorcery.png');
	addLang('skills.img.' + SKILL_TWILIGHT_BASICS, 'invocation/chaos.png');
	addLang('skills.img.' + SKILL_APPLEJACK_AXIOM, 'invocation/sorcery.png');
	addLang('skills.img.' + SKILL_APPLEJACK_VISION, 'invocation/arcane.png');
	addLang('skills.img.' + SKILL_APPLEJACK_PRAGMATISM, 'invocation/mana.png');
	addLang('skills.img.' + SKILL_APPLEJACK_EVOLUTION, 'invocation/life.png');


				// religion
	addLang('religion.btn.small'  , '<div class="btn god" title="%d"><span class="title">%t</span></div>');
	addLang('religion.description', '<div class="title"><b class="type">%t</b></div>%d');

				// logs
	addLang('log.time', '%t: ');

				// generic things
	addLang('br', '<br />');
	addLang('cleaner', '<div class="cleaner"></div>');
	
				// attributes
	addLang('attr.good', '<br><b class="good">+%v</b>: %t');
	addLang('attr.bad' , '<br><b class="bad">%v</b>: %t');

				// enemy
	addLang('enemy.attack', '<div class="enemy_attack cleaner"><IMG SRC="images/skills/attack.png"> <div>%a</div></div>');

				// map tiles
	addLang('map.tile'      , '<SPAN onClick="World.action(%x, %y, 0);">%s</SPAN>');
	addLang('map.tile.full' , '<SPAN onClick="World.action(%x, %y, 0);" onMouseOver="World.action(%x1, %y1, 1);">%s</SPAN>');

	addLang('abilities.img.1', 'bloodless.png');
	addLang('abilities.img.2', 'beast.png');
	addLang('abilities.img.3', 'berserk.png');
	addLang('abilities.img.4', 'blink.png');
	addLang('abilities.img.5', 'coward.png');
	addLang('abilities.img.6', 'cursed.png');
	addLang('abilities.img.7', 'death_ward.png');
	addLang('abilities.img.8', 'first_strike.png');
	addLang('abilities.img.9', 'magical_attack.png');
	addLang('abilities.img.10', 'mana_drain.png');
	addLang('abilities.img.11', 'no_exp.png');
	addLang('abilities.img.12', 'poison.png');
	addLang('abilities.img.13', 'regeneration.png');
	addLang('abilities.img.14', 'slow.png');
	addLang('abilities.img.15', 'spawn.png');
	addLang('abilities.img.16', 'vampiric.png');
	addLang('abilities.img.17', 'weaken.png');
	addLang('abilities.img.18', 'champion.png');
	addLang('abilities.img.19', 'caster.png');
	addLang('abilities.img.20', 'peaceful.png');
	addLang('abilities.img.21', 'forester.png');
	addLang('abilities.img.22', 'following.png');
	addLang('abilities.img.23', 'scary.png');
	addLang('abilities.img.24', 'crystals.png');

	addLang('abilities.img.50', 'phys_defence.png');
	addLang('abilities.img.51', 'magic_defence.png');
	addLang('abilities.img.52', 'corruption.png');
	addLang('abilities.img.53', 'weakness.png');
	addLang('abilities.img.54', 'vampiric.png');
	addLang('abilities.img.55', 'integrity.png');
	addLang('abilities.img.56', 'hoard.png');

	addLang('abilities.img.70', 'alchemist_bomb.png');
	addLang('abilities.img.71', 'camouflage.png');
	addLang('abilities.img.72', 'flanking.png');
	addLang('abilities.img.73', 'charge.png');
	addLang('abilities.img.74', 'charge.png');
	addLang('abilities.img.75', 'charge.png');
	addLang('abilities.img.76', 'charge.png');

	addLang('abilities.img.100', 'e_cursed.png');
	addLang('abilities.img.101', 'e_drained.png');
	addLang('abilities.img.102', 'e_poisoned.png');
	addLang('abilities.img.103', 'e_warded.png');
	addLang('abilities.img.104', 'e_shielded.png');
	addLang('abilities.img.105', 'e_empowered.png');
	addLang('abilities.img.106', 'e_whine.png');
	addLang('abilities.img.107', 'e_peaceful.png');
	addLang('abilities.img.108', 'e_scared.png');
}