function add(type) {
  switch(type) {
    case "click":
      insertAtCaret("textarea", "[click](/click)")
      break
    case "credit":
      insertAtCaret("textarea", "[credit](/credit)")
      break
    case "recur":
      insertAtCaret("textarea", "[recuringcred](/recur)")
      break
    case "link":
      insertAtCaret("textarea", "[link](/link)")
      break
    case "trash":
      insertAtCaret("textarea", "[trash](/trash)")
      break
    case "mem":
      insertAtCaret("textarea", "[](/mem)")
      break
    case "sub":
      insertAtCaret("textarea", "↳")
      break
  }
}

function run() {
  unique = document.getElementsByClassName('checkbox-input')[0].checked
  input = document.getElementsByClassName('text-input')
  type = document.getElementById('type-select')
  influence = document.getElementById('influence-select')
  faction = document.getElementById('faction-select')
  result = document.getElementById('result-area')

  var output = "**"
  if(unique) output += "♦ "
  output += input.name.value+"** "

  if(type.value=="Identity") {
    if(faction.value=="Shaper"||faction.value=="Anarch"||faction.value=="Criminal") {
      output += input.cost.value +"[link](/link)"
    }
    output += "  \n" + faction.value + " Identity: " + input.subtypes.value
    output += "  \n" + input.trash.value + "/" + input.strength.value
    output += "\n\n"
    output += input.textarea.value
    output += "\n\n"
    output += "*"+input.flavour.value+"*"
  }
  else {
    output += "  \n" + faction.value + " "+type.value+": " + input.subtypes.value
    output += "  \n" + input.cost.value
    if(type.value!="Agenda") {
      output += "[credit](/credit)"
    }
    else {
      output += "⚙"
    }

    if(type.value=="Asset"||type.value=="Upgrade"||type.value=="Operation"||type.value=="ICE") {
      if(input.trash.value.trim()!="") {
        output += "   " + input.trash.value
        output += "[trash](/trash)"

      }
    }
    else if(type.value=="Agenda") {
      output += "   " + input.trash.value
      output += "⫴"
    }
    else if(type.value=="Program") {
      output += "   [" + input.trash.value + "](/mem)"
    }

    if(type.value=="Program"||type.value=="ICE") {
      output += "   " + input.strength.value + "☰"
    }

    if(influence.value.trim() != "") {
      output += " "
      for(var i=1; i<=influence.value; i++) {
        output += "•"
      }
    }

    output += "\n\n"
    output += input.textarea.value + "\n\n"
    if(input.flavour.value.trim()!="") {
      output += "*" + input.flavour.value + "*"
    }
  }

  result.value = output

}

function changeLabels() {
  type = document.getElementById('type-select')

  cost = document.getElementById('cost-label')
  trash = document.getElementById('trash-label')
  strength = document.getElementById('strength-label')

  if(type.value=="Asset"||type.value=="Upgrade"||type.value=="ICE"||type.value=="Operation"||type.value=="Event"||type.value=="Hardware"||type.value=="Resource") {
    cost.innerHTML = '<b>Cost</b>'
    trash.innerHTML = '<b>Trash</b>'
    strength.innerHTML = '<b>Strength</b>'
  }

  if(type.value=="Program") {
    cost.innerHTML = '<b>Cost</b>'
    trash.innerHTML = '<b>Memory</b>'
    strength.innerHTML = '<b>Strength</b>'
  }

  if(type.value=="Agenda") {
    cost.innerHTML = '<b>Advance</b>'
    trash.innerHTML = '<b>Points</b>'
    strength.innerHTML = '<b>Strength</b>'
  }

  if(type.value=="Identity") {
    cost.innerHTML = '<b>Link</b>'
    trash.innerHTML = '<b>Deck Size</b>'
    strength.innerHTML = '<b>Inf Limit</b>'
  }
}

function insertAtCaret(areaId, text) { //courtesy of George Claghorn @ stackoverflow
  var txtarea = document.getElementById(areaId);
  if (!txtarea) { return; }

  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false ) );
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    strPos = range.text.length;
  } else if (br == "ff") {
    strPos = txtarea.selectionStart;
  }

  var front = (txtarea.value).substring(0, strPos);
  var back = (txtarea.value).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var ieRange = document.selection.createRange();
    ieRange.moveStart ('character', -txtarea.value.length);
    ieRange.moveStart ('character', strPos);
    ieRange.moveEnd ('character', 0);
    ieRange.select();
  } else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }

  txtarea.scrollTop = scrollPos;
}
