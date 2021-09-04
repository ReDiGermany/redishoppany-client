import React from 'react'
import { View, Text } from 'react-native'
import Navigation from '../components/Navigation'
import IAboutProps from '../interfaces/IAboutProps'
import SafeComponent from '../components/SafeComponent'
import ScrollView from '../components/ScrollView'

export default class About extends SafeComponent<IAboutProps> {
  render() {
    return (
      <View>
        <Navigation user={this.props.user} label="About" />
        <ScrollView noRefresh={true} onRefresh={() => {}}>
          <Text style={{ color: '#fff', padding: 20 }}>
            LiSha ist die App, um den täglichen Einkaufsbedarf zu strukturieren
            und Organisieren. {'\n'}
            {'\n'}
            Entstanden ist LiSha durch den persönlichen nutzungsbedarf um das
            Leben im mehrköpfigen Haushalt zu optimieren und digitalisieren.
            {'\n'}
            Die Ursprungsidee stammt aus einer privaten App um nicht mehr mit
            dem Einkaufszettel im Laden zu stehen{'\n'}
            Daraus wurde eine App, in der wir unsere Rezepte speichern können um
            diese automatisch in die einzelnenListen hinzufügen zu können.{'\n'}
            {'\n'}
            Da wir von Haus aus Faul sind und oftmals vergessen, welche Rezepte
            wir bereits probiert und für gut befunden haben, brauchten wir eine
            art digitales Rezeptbuch inkl. Essensplan.{'\n'}
            Da ich aktuell keine ahnung mehr habe, was ich hier rein schreiben
            will schreibe ich einfach noch ein bisschen mehr Text, um diese
            Seite vollständig zu füllen.{'\n'} Ich möchte nämlich sehen, wie das
            ganze mit etwas mehr Text aussieht und schreibe daher noch einen
            zusätzlichen Absatz.{'\n'}Meine Nachbarn schreien hier um 20:35
            draußen rum, als wären sie aus einem Pavian gehege entflohen aber
            das tut dem ganzen kein abbruch.{'\n'}Ich gehe gleich so oder so
            wieder rein, da es langsam ziemlich Kalt wird.{'\n'}Die Grillen
            Zierpen hier schon ne ganze Weile und das einzige Licht, was ich
            noch sehe kommt von drinnen, meinem Notebook und meinem Handy. LOL
            {'\n'}Ich denke das sollte langsam genug Text sein Pog{'\n'}
            {'\n'}
            Freiwilliger Bildernachweis:
            {'\n'}
            https://pixabay.com/de/photos/hochzeitsfeier-bankett-geschirr-1967373/
            {'\n'}
            {'\n'}Ok da es immer noch nicht reicht, um aus dem Bildschirm raus
            zu kommen, muss ich noch etwas mehr schreiben.{'\n'}Ich weiß jedoch
            langsam nicht mehr was, deswegen muss ich mir ziemlich was aus der
            nase ziehen.{'\n'}Ich habe Hunger. Ich habe heute noch kein
            Abendbrot gehabt und Maria wartet bestimmt auch schon :D{'\n'}Okay
            das reicht jetzt hier auch, ich darf endlich scrollen, und stelle
            fest, dass ich gar keine Scrollview drin habe. Das füge ich jetzt
            noch ein.{'\n'}
            {'\n'}Gruß{'\n'}ReDi
          </Text>
        </ScrollView>
      </View>
    )
  }
}
