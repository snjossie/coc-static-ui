import logo from './logo.svg';
import './App.css';
import { Skill } from './skill';

function App() {

  const arr = [
    new Skill("Accounting (5%)", 5),
    new Skill("Appraise (5%)", 5),
    new Skill("Archaeology (1%)", 1),
    new Skill("Art/Craft (5%)", 40),
    new Skill("Art/Craft", 30),
    new Skill("Charm (15%)", 45),
    new Skill("Climb (20%)", 20),
    new Skill("Computer Use (0%)", 0),
    new Skill("Credit Rating (0%)", 70),
    new Skill("Cthulhu Mythos (0%)", 0),
    new Skill("Demolitions (1%)", 1),
    new Skill("Disguise (5%)", 45),
    new Skill("Diving (1%)", 1),
    new Skill("Dodge (half DEX)", 45),
    new Skill("Drive Auto (20%)", 20),
    new Skill("Elec. Repair (10%)", 10),
    new Skill("Fast Talk (5%)", 5),
    new Skill("Fighting (Brawl) (25%)", 25),
    new Skill("Fighting", 0),
    new Skill("Fighting 2", 1),
    new Skill("Firearms (Handgun) (20%)", 20),
    new Skill("Firearms (Rifle/Shotgun) (25%)", 25),
    new Skill("Firearms (SMB) (15%)", 15),
    new Skill("Firearms", 1),
    new Skill("First Aid (30%)", 30),
    new Skill("History (5%)", 30),
    new Skill("Intimidate (15%)", 15),
    new Skill("Jump (20%)", 20),
    new Skill("Language (1%)", 25),
    new Skill("Language", 20),
    new Skill("Language (Own) (EDU)", 70),
    new Skill("Law (5%)", 0),
    new Skill("Library Use (20%)", 5),
    new Skill("Listen (20%)", 20),
    new Skill("Locksmith (1%)", 40),
    new Skill("Mech. Repair (10%)", 10),
    new Skill("Medicine (1%)", 1),
    new Skill("Natural World (10%)", 10),
    new Skill("Navigate (10%)", 10),
    new Skill("Occult (5%)", 40),
    new Skill("Op. Hv. Machine (1%)", 1),
    new Skill("Persuade (10%)", 45),
    new Skill("Pilot (1%)", 1),
    new Skill("Psychoanalysis (1%)", 40),
    new Skill("Psychology (10%)", 30),
    new Skill("Read Lips (1%)", 1),
    new Skill("Ride (5%)", 5),
    new Skill("Science (1%)", 1),
    new Skill("Science", 1),
    new Skill("Sleight of Hand (10%)", 50),
    new Skill("Spot Hidden (25%)", 35),
    new Skill("Stealth (20%)", 20),
    new Skill("Survival (10%)", 10),
    new Skill("Swim (20%)", 20),
    new Skill("Throw (20%)", 20),
    new Skill("Track (10%)", 10),
    new Skill("Telekinesis", 70),
    new Skill("(blank 2)", 0),
    new Skill("(blank 3)", 0),
    new Skill("(blank 4)", 0)
  ];

  return (
    <div className="App">
      <header className="App-header">
        Cthulhu UI
      </header>
      <div class="container-basic-info section">
        <div class="demographics">
          
            <label for="name">Name</label>
            <input type="text" id="name" />
            <label for="Player">Player</label>
            <input type="text" id="Player" />
            <label for="Occupation">Occupation</label>
            <input type="text" id="Occupation" />
            <label for="Age">Age</label>
            <input type="text" id="Age" />
            <label for="Sex">Sex</label>
            <input type="text" id="Sex" />
            <label for="Archetype">Archetype</label>
            <input type="text" id="Archetype" />
            <label for="Residence">Residence</label>
            <input type="text" id="Residence" />
            <label for="Birthplace">Birthplace</label>
            <input type="text" id="Birthplace" />
          
        </div>
        <div class="characteristics">
          <div class="characteristic">
            <div class="chr-nme">STR</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">CON</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">SIZ</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">DEX</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">APP</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">EDU</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">INT</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme">POW</div>
            <div class="chr-success"><input type="button" value="40" /></div>
            <div class="chr-bigsuccess">20</div>
            <div class="chr-extremesuccess">8</div>
          </div>
          <div class="characteristic">
            <div class="chr-nme" style={{fontSize: "x-large"}}>Move Rate</div>
            <div class="chr-success">7</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h1>HP, Luck, Sanity, MP go here</h1>
      </div>

      <div class="section">
        <h1>Hero Skills</h1>
        <div class="skills-container">
          { arr.map((x, i) => 
            <div key={x.name}>
              <div class="name"><input type="checkbox" value="{x.name}" />{x.name}</div> 
              <div class="skill-values">
                <input class="success" type="button" value={x.successValue} />
                <span class="bigsuccess">{Math.floor(x.successValue * 0.5)}</span>
                <span class="extremesuccess">{Math.floor(x.successValue * 0.2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div class="section">
        <h1>Weapons go here</h1>
      </div>

      <div class="section">
        <h1>Credit/Pulp Skills go here</h1>
      </div>
    </div>
  );
}

export default App;
